import { Util } from './util';
import { Log } from './logger';

/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS202: Simplify dynamic range loops
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// Handles all of the various rendering methods in Caman. Most of the image modification happens
// here. A new Renderer object is created for every render operation.
class Renderer {
  static initClass() {
    // The number of blocks to split the image into during the render process to simulate
    // concurrency. This also helps the browser manage the (possibly) long running render jobs.
    this.Blocks = 4;
  }

  constructor(c) {
    this.processNext = this.processNext.bind(this);
    this.c = c;
    this.renderQueue = [];
    this.modPixelData = null;
  }

  add(job) {
    if (job == null) { return; }
    return this.renderQueue.push(job);
  }

  // Grabs the next operation from the render queue and passes it to Renderer
  // for execution
  processNext() {
    // If the queue is empty, fire the finished callback
    if (this.renderQueue.length === 0) {
      Caman.Event.trigger(this, "renderFinished");
      if (this.finishedFn != null) { this.finishedFn.call(this.c); }

      return this;
    }

    this.currentJob = this.renderQueue.shift();

    switch (this.currentJob.type) {
      case Caman.Filter.Type.LayerDequeue:
        var layer = this.c.canvasQueue.shift();
        this.c.executeLayer(layer);
        return this.processNext();
      case Caman.Filter.Type.LayerFinished:
        this.c.applyCurrentLayer();
        this.c.popContext();
        return this.processNext();
      case Caman.Filter.Type.LoadOverlay:
        return this.loadOverlay(this.currentJob.layer, this.currentJob.src);
      case Caman.Filter.Type.LoadLayerMask:
        return this.loadLayerMask(this.currentJob.layer, this.currentJob.src);
      case Caman.Filter.Type.Plugin:
        return this.executePlugin();
      default:
        return this.executeFilter();
    }
  }

  execute(callback) {
    this.finishedFn = callback;
    this.modPixelData = Util.dataArray(this.c.pixelData.length);

    return this.processNext();
  }

  eachBlock(fn) {
    // Prepare all the required render data
    this.blocksDone = 0;

    const n = this.c.pixelData.length;
    const blockPixelLength = Math.floor((n / 4) / Renderer.Blocks);
    const blockN = blockPixelLength * 4;
    const lastBlockN = blockN + (((n / 4) % Renderer.Blocks) * 4);

    return (() => {
      const result = [];
      for (var i = 0, end1 = Renderer.Blocks, asc = 0 <= end1; asc ? i < end1 : i > end1; asc ? i++ : i--) {
        var start = i * blockN;
        var end = start + (i === (Renderer.Blocks - 1) ? lastBlockN : blockN);

        if (Caman.NodeJS) {
          const f = Fiber(() => fn.call(this, i, start, end));
          const bnum = f.run();
          result.push(this.blockFinished(bnum));
        } else {
          result.push(setTimeout(((i, start, end) => {
              return () => fn.call(this, i, start, end);
            })(i, start, end)
            , 0));
        }
      }
      return result;
    })();
  }

  // The core of the image rendering, this function executes the provided filter.
  //
  // NOTE: this does not write the updated pixel data to the canvas. That happens when all filters
  // are finished rendering in order to be as fast as possible.
  executeFilter() {
    Caman.Event.trigger(this.c, "processStart", this.currentJob);

    if (this.currentJob.type === Caman.Filter.Type.Single) {
      return this.eachBlock(this.renderBlock);
    } else {
      return this.eachBlock(this.renderKernel);
    }
  }

  // Executes a standalone plugin
  executePlugin() {
    Log.debug(`Executing plugin ${this.currentJob.plugin}`);
    Caman.Plugin.execute(this.c, this.currentJob.plugin, this.currentJob.args);
    Log.debug(`Plugin ${this.currentJob.plugin} finished!`);

    return this.processNext();
  }

  // Renders a single block of the canvas with the current filter function
  renderBlock(bnum, start, end) {
    Log.debug(`Block #${bnum} - Filter: ${this.currentJob.name}, Start: ${start}, End: ${end}`);
    Caman.Event.trigger(this.c, "blockStarted", {
        blockNum: bnum,
        totalBlocks: Renderer.Blocks,
        startPixel: start,
        endPixel: end
      }
    );

    const pixel = new Caman.Pixel();
    pixel.setContext(this.c);

    for (let i = start, end1 = end; i < end1; i += 4) {
      pixel.loc = i;

      pixel.r = this.c.pixelData[i];
      pixel.g = this.c.pixelData[i+1];
      pixel.b = this.c.pixelData[i+2];
      pixel.a = this.c.pixelData[i+3];

      this.currentJob.processFn(pixel);

      this.c.pixelData[i]   = Util.clampRGB(pixel.r);
      this.c.pixelData[i+1] = Util.clampRGB(pixel.g);
      this.c.pixelData[i+2] = Util.clampRGB(pixel.b);
      this.c.pixelData[i+3] = Util.clampRGB(pixel.a);
    }

    return this.blockFinished(bnum);
  }

  // Applies an image kernel to the canvas
  renderKernel(bnum, start, end) {
    const { name } = this.currentJob;
    const { bias } = this.currentJob;
    const { divisor } = this.currentJob;
    const n = this.c.pixelData.length;

    const { adjust } = this.currentJob;
    const adjustSize = Math.sqrt(adjust.length);

    const kernel = [];

    Log.debug(`Rendering kernel - Filter: ${this.currentJob.name}`);

    start = Math.max(start, this.c.dimensions.width * 4 * ((adjustSize - 1) / 2));
    end = Math.min(end, n - (this.c.dimensions.width * 4 * ((adjustSize - 1) / 2)));

    const builder = (adjustSize - 1) / 2;

    const pixel = new Caman.Pixel();
    pixel.setContext(this.c);

    for (let i = start, end1 = end; i < end1; i += 4) {
      pixel.loc = i;
      let builderIndex = 0;

      for (let j = -builder, end2 = builder, asc = -builder <= end2; asc ? j <= end2 : j >= end2; asc ? j++ : j--) {
        for (let k = builder, end3 = -builder, asc1 = builder <= end3; asc1 ? k <= end3 : k >= end3; asc1 ? k++ : k--) {
          const p = pixel.getPixelRelative(j, k);
          kernel[builderIndex * 3]     = p.r;
          kernel[(builderIndex * 3) + 1] = p.g;
          kernel[(builderIndex * 3) + 2] = p.b;

          builderIndex++;
        }
      }

      const res = this.processKernel(adjust, kernel, divisor, bias);

      this.modPixelData[i]    = Util.clampRGB(res.r);
      this.modPixelData[i+1]  = Util.clampRGB(res.g);
      this.modPixelData[i+2]  = Util.clampRGB(res.b);
      this.modPixelData[i+3]  = this.c.pixelData[i+3];
    }

    return this.blockFinished(bnum);
  }

  // Called when a single block is finished rendering. Once all blocks are done, we signal that this
  // filter is finished rendering and continue to the next step.
  blockFinished(bnum) {
    if (bnum >= 0) { Log.debug(`Block #${bnum} finished! Filter: ${this.currentJob.name}`); }
    this.blocksDone++;

    Caman.Event.trigger(this.c, "blockFinished", {
        blockNum: bnum,
        blocksFinished: this.blocksDone,
        totalBlocks: Renderer.Blocks
      }
    );

    if (this.blocksDone === Renderer.Blocks) {
      if (this.currentJob.type === Caman.Filter.Type.Kernel) {
        for (let i = 0, end = this.c.pixelData.length, asc = 0 <= end; asc ? i < end : i > end; asc ? i++ : i--) {
          this.c.pixelData[i] = this.modPixelData[i];
        }
      }

      if (bnum >=0) { Log.debug(`Filter ${this.currentJob.name} finished!`); }
      Caman.Event.trigger(this.c, "processComplete", this.currentJob);

      return this.processNext();
    }
  }

  // The "filter function" for kernel adjustments.
  processKernel(adjust, kernel, divisor, bias) {
    const val = {r: 0, g: 0, b: 0};

    for (let i = 0, end = adjust.length, asc = 0 <= end; asc ? i < end : i > end; asc ? i++ : i--) {
      val.r += adjust[i] * kernel[i * 3];
      val.g += adjust[i] * kernel[(i * 3) + 1];
      val.b += adjust[i] * kernel[(i * 3) + 2];
    }

    val.r = (val.r / divisor) + bias;
    val.g = (val.g / divisor) + bias;
    val.b = (val.b / divisor) + bias;
    return val;
  }

  // Loads an image onto the current canvas
  loadOverlay(layer, src) {
    const img = new Image();
    img.onload = () => {
      layer.context.drawImage(img, 0, 0, this.c.dimensions.width, this.c.dimensions.height);
      layer.imageData = layer.context.getImageData(0, 0, this.c.dimensions.width, this.c.dimensions.height);
      layer.pixelData = layer.imageData.data;

      this.c.pixelData = layer.pixelData;

      return this.processNext();
    };

    const proxyUrl = Caman.IO.remoteCheck(src);
    return img.src = (proxyUrl != null) ? proxyUrl : src;
  }

  // Loads an image and save as mask data
  loadLayerMask(layer, src) {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = this.c.dimensions.width;
      canvas.height = this.c.dimensions.height;
      const context = canvas.getContext('2d');
      context.drawImage(img, 0, 0, this.c.dimensions.width, this.c.dimensions.height);
      const maskData = context.getImageData(0, 0, this.c.dimensions.width, this.c.dimensions.height);
      layer.maskData = maskData.data;

      return this.processNext();
    };

    const proxyUrl = Caman.IO.remoteCheck(src);
    return img.src = (proxyUrl != null) ? proxyUrl : src;
  }
}

Renderer.initClass();

export default Renderer;

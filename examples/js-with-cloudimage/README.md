# Filerobot Image Editor using cloudimage service

In this mode, Filerobot Image Editor transforms original url using cloudimage service in order to apply transformations on image.
To make it work you need to set the following configuration.

```
<script>
  const config = {
      cloudimageToken: 'demo'
      processWithCloudimage: true,
      hideCloudimageSwitcher: true
    };
</script>
```
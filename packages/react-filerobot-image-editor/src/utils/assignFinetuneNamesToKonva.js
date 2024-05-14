const assignFinetuneNamesToKonva = () => {
  Object.keys(Konva.Filters).forEach((key) => Konva.Filters[key].finetuneName = key)
}

export default assignFinetuneNamesToKonva;

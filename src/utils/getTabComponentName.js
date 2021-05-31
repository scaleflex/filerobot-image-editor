const getTabComponentName = (tabId) => (
  `${tabId[0].toUpperCase()}${tabId.toLowerCase().substr(1)}`
)

export default getTabComponentName;

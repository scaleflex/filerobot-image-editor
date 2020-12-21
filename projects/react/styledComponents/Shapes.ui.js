import styled from 'styled-components';

const AddWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const ItemsWrapper = styled.div`
  color: ${props => props.theme.colors.text};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center; 
  width: fit-content;
  min-width: 111px;
  max-width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  
  ::-webkit-scrollbar {
    height: 10px !important;
  }
   
  ::-webkit-scrollbar-thumb {
    background: #3b4d54;
    border-radius: 5px;
  }
  
  @media (min-width: 768px) {
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
  }
`;

const SettingsWrapper = styled.div`
  height: 100%;
  padding: 0 15px;
  display: flex;
  align-items: center;
`;

const ItemGroup = styled.div`
  padding: 8px 25px;

  * {
    cursor: pointer;
  }
`;

const ItemIcon = styled.div`
  width: 50px;
  height: 50px;
  max-width: 50px;
  max-height: 50px;
  padding-bottom: 3px;
  cursor: pointer;
  margin-left: auto;
  margin-right: auto;

  ${p => p.isIconNotProvided && `
    background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE3LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDQ5NSA0OTUiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ5NSA0OTU7IiB4bWw6c3BhY2U9InByZXNlcnZlIiBmaWxsPSJ3aGl0ZSI+DQo8Zz4NCgk8cGF0aCBkPSJNNDk1LDEwMy41MTNWOTUuNWMwLTIxLjc4LTE3LjcyLTM5LjUtMzkuNS0zOS41aC00MTZDMTcuNzIsNTYsMCw3My43MiwwLDk1LjV2MzAzLjk5N2MwLDAuMDAzLDAsMC4wMDUsMCwwLjAwOA0KCQlDMC4wMDMsNDIxLjI4MywxNy43MjIsNDM5LDM5LjUsNDM5aDQxNmMyMS43OCwwLDM5LjUtMTcuNzIsMzkuNS0zOS41VjEwMy41MjFDNDk1LDEwMy41MTgsNDk1LDEwMy41MTYsNDk1LDEwMy41MTN6IE0zOS41LDcxaDQxNg0KCQljMTMuNTA5LDAsMjQuNSwxMC45OSwyNC41LDI0LjV2NC44ODNjLTM1LjEyMSwzNC45NjMtOTIuODUsOTIuNDY0LTE0MC43MjEsMTQwLjI4OWwtNzUuMTYyLTc1LjE2Mg0KCQljLTkuMTYyLTkuMTYyLTI0LjA3MS05LjE2Mi0zMy4yMzMsMEwxNSwzODEuMzkzVjk1LjVDMTUsODEuOTksMjUuOTkxLDcxLDM5LjUsNzF6IE00NTUuNSw0MjRoLTQxNg0KCQljLTEyLjUxOSwwLTIyLjg2OC05LjQzOS0yNC4zMTktMjEuNTc0TDI0MS40OSwxNzYuMTE3YzMuMzE0LTMuMzE0LDguNzA2LTMuMzE0LDEyLjAyMSwwbDc1LjE1OCw3NS4xNTgNCgkJQzI4OS4yNiwyOTAuNjcsMjU4LjgxMywzMjEuMjQ5LDI1Ny41LDMyM2MtMi40ODUsMy4zMTMtMS44MTQsOC4wMTUsMS41LDEwLjVjMS4zNDksMS4wMTIsMi45MjgsMS41LDQuNDk0LDEuNQ0KCQljMi4xODcsMCw0LjM0OS0wLjk1Myw1LjgyMi0yLjc2NEMyNzUuMDc1LDMyNS43Nyw0MTIuOTYyLDE4OC4zMDgsNDgwLDEyMS41NTFWMzk5LjVDNDgwLDQxMy4wMSw0NjkuMDA5LDQyNCw0NTUuNSw0MjR6Ii8+DQoJPHBhdGggZD0iTTEwMy41LDE5OWMyMS43OCwwLDM5LjUtMTcuNzIsMzkuNS0zOS41UzEyNS4yOCwxMjAsMTAzLjUsMTIwUzY0LDEzNy43Miw2NCwxNTkuNVM4MS43MiwxOTksMTAzLjUsMTk5eiBNMTAzLjUsMTM1DQoJCWMxMy41MDksMCwyNC41LDEwLjk5LDI0LjUsMjQuNVMxMTcuMDA5LDE4NCwxMDMuNSwxODRTNzksMTczLjAxLDc5LDE1OS41Uzg5Ljk5MSwxMzUsMTAzLjUsMTM1eiIvPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=');
    background-size: cover;
    background-repeat: no-repeat;
  `};

  img {
    max-width: 100%;
  }
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  jutifyContent: center;
  alignItems: center;
  margin: 20px;

  input {
    margin-left: auto;
    margin-right: auto;
  }
`;

const FieldCustomLabel = styled.label`
  color: ${props => props.theme.colors.text || '#ffffff'};
  display: inline-block;
  margin-bottom: 0;
`;

export {
  AddWrapper, ItemsWrapper, SettingsWrapper, ItemGroup, ItemIcon, FieldCustomLabel, FieldGroup,
};

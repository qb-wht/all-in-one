export const initialContent = `
style StyleName {
  color: #000000
  background-color: #ffffff
}

logic LogicName {
  console.log("Hello, World!")
}

event EventName {
  logics: LogicName
}

div SubElementName {
  styles: []
  events: []
  children: []
}
  
div ElementName {
  styles: Name
  events: EventName
  children: SubElementName
}










`;

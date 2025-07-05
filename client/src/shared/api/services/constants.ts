export const initialContent = `import "common.wbp"

style PrimaryButton {
  color: #ffffff
  background-color: #007bff
  padding: 8px 16px
  border-radius: 4px
}

state Counter = 0

logic IncrementCounter {
  Counter = Counter + 1
  console.log("Counter is now: " + Counter)
}

event click OnClickIncrement {
  logics: [IncrementCounter]
}

button IncrementButton {
  styles: [PrimaryButton]
  events: [OnClickIncrement]
  children: ["Click me!"]
}

div CounterDisplay {
  styles: []
  events: []
  children: ["Counter: {Counter}]
}

div Root {
  styles: []
  events: []
  children: [CounterDisplay, IncrementButton]
}










`;

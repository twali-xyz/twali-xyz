//                                                    _
//         (:)_
//         ,'    `.
//        :        :
//        |        |              ___
//        |       /|    ______   // _\
//        ; -  _,' :  ,'      `. \\  -\
//       /          \/          \ \\  :
//      (            :  ------.  `-'  |
//   ____\___    ____|______   \______|_______
//           |::|           '--`
//           |::|
//           |::|
//           |::|
//           |::;
//           `:/
//
// sets new values & identity for the corresponding event in an array
// requires an event with event.target.name == <stateName><number> e.g. "industryExpertise2" or "functionalExpertise1"
// (e.g. values/identity = {bio: "",
//                          name: "userName",
//                          ...,
//                       -> functionalExpertiseindustryExpertise = [oldValue, newValue, ""],
//                       -> industryExpertise = [newValue, oldValue, ""]
//                       -> strippedEventName = [...eventArray]
// })

export function setEventArray({ evt, values, setValues }) {
  if (!evt) return;
  const eventName = evt.target.name;
  const [strippedEventName, eventIndex] = [
    eventName.substring(0, eventName.length - 1),
    Number(eventName[eventName.length - 1]),
  ];

  const eventValues = values[strippedEventName];
  let eventArray = [];
  for (let i = 0; i <= eventValues?.length; i++) {
    if (i === eventIndex - 1) {
      eventArray.push(evt.target.value);
    } else if (eventValues[i]) {
      eventArray.push(eventValues[i]);
    }
  }

  setValues((values) => ({
    ...values,
    [strippedEventName]: eventArray,
  }));
}

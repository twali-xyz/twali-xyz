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

export function setEventArray({
  evt,
  values,
  setValues,
  userData,
  setUserData,
}) {
  if (!evt) return;
  const eventName = evt.target.name;
  const [strippedEventName, eventIndex] = [
    eventName.substring(0, eventName.length - 1),
    Number(eventName[eventName.length - 1]),
  ];

  const eventValues = values[strippedEventName];
  console.log('event values', eventValues);
  let eventArray = [];
  for (let i = 0; i <= eventValues?.length; i++) {
    if (i === eventIndex - 1) {
      eventArray.push(evt.target.value);
    } else {
      eventArray.push(eventValues[i]);
    }
  }
  console.log('EVENT ARRAY', eventArray);
  setValues((values) => ({
    ...values,
    [strippedEventName]: eventArray,
  }));
  console.log(values);
  console.log(evt.target.name);
  const value = evt.target.value;

  setUserData({
    ...userData,
    functionalExpertise: values.functionalExpertise,
    industryExpertise: values.industryExpertise
  });

  console.log(userData);
}

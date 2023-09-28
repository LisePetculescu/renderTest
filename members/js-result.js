import { matchResultMember, members } from "./js-script.js";
//
function construct(resultData) {
  const matchingMember = matchResultMember(resultData.memberId, members);

  const ResultObject = {
    date: new Date(resultData.date),
    memberId: resultData.memberId,
    _discipline: resultData.discipline,
    _type: resultData.resultType,
    _time: resultData.time,
    _id: resultData.id,
    get milisecTime() {
      const [minutes, seconds, centiseconds] = this._time.split(/[:.]/);

      // console.log(minutes);
      // console.log(seconds);
      // console.log(centiseconds);

      // const newTime = minutes * 60 * 1000 + seconds * 1000 + centiseconds * 10;
      // console.log(newTime);
      return minutes * 60 * 1000 + seconds * 1000 + centiseconds * 10;
    },
    get time() {
      return this._time;
    },
    set time(time) {
      this._time = time;
    },
    // get type() {
    //   // return this._type === "competition" ? "Stævne" : "Træning";
    // },
    get isTraining() {
      return this._type === "training";
    },
    get isCompetition() {
      return this._type === "competition";
    },
    get memberName() {
      return matchingMember ? `${matchingMember.firstName} ${matchingMember.lastName}` : "Intet Medlem";
    }
  };
  Object.defineProperties(ResultObject, {
    _id: {
      writable: false
    },
    time: {
      enumerable: false
    },
    type: {
      enumerable: false
    }
  });
  // console.log(ResultObject.memberName);
  // console.log(ResultObject.isTraining);
  // console.log(resultData.time);
  // console.log(ResultObject);
  return ResultObject;
}

export { construct };

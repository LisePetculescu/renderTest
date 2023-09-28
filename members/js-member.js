function construct(memberdata) {
  const MemberObject = {
    firstName: memberdata.firstName,
    lastName: memberdata.lastName,
    _active: memberdata.isActiveMember,
    competitive: memberdata.isCompetitive,
    birthday: new Date(memberdata.dateOfBirth),
    email: memberdata.email,
    gender: memberdata.gender,
    image: memberdata.image,
    hasPayed: memberdata.hasPayed,
    _id: memberdata.id,
    get age() {
      return new Date().getFullYear() - this.birthday.getFullYear();
    },
    get isJunior() {
      return this.age < 18;
    },
    get isSenior() {
      return this.age >= 18;
    },
    get ageGroup() {
      if (this.isJunior) {
        return "Junior";
      } else {
        return "Senior";
      }
    },
    get active() {
      return this._active ? "Aktiv" : "Inaktiv";
    },
  };

  Object.defineProperties(MemberObject, {
    _id: {
      writable: false,
    },
    firstName: {
      enumerable: false,
    },
    lastName: {
      enumerable: false,
    },
    image: {
      enumerable: false,
    },
  });

  // kan ændre property value, men ikke tilføje properties
  Object.seal(MemberObject);

  // dette er muligt (men fjollet)
  // MemberObject.firstName = 11;

  // dette er ikke muligt pga. seal()
  // MemberObject.alder = 11;

  // console.log(MemberObject);
  return MemberObject;
}

export { construct };

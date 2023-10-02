function construct(list) {
  const ListRenderer = {
    render() {
      // MemberRenderer.render();
      ResultRenderer.render();
    }
    // render(members, results) {
    //   MemberRenderer.render(members);
    //   ResultRenderer.render(results);
    // }
  };
  const MemberRenderer = {
    render(members) {
      const table = document.querySelector("table#membersTable tbody");
      table.innerHTML = "";
      // console.log(members);
      for (const member of list) {
        const name = member.firstName + " " + member.lastName;

        const html = /*html*/ `
    <tr>
      <td>${name}</td>
      <td>${member.active}</td>
      <td>${member.birthday.toLocaleString("da", {
        day: "numeric",
        month: "short",
        year: "numeric"
      })}</td>
      <td>${member.age}</td>
      <td>${member.ageGroup}</td>
      <td>${member.email}</td>
    </tr>`;
        table.insertAdjacentHTML("beforeend", html);
      }
    }
  };
  const ResultRenderer = {
    render(results) {
      // results.sort((a, b) => a.milisecTime - b.milisecTime);

      const table = document.querySelector("table#results tbody");
      table.innerHTML = "";

      for (const result of list) {
        let desciplin;

        if (result._discipline === "backstroke") {
          desciplin = "Ryg";
        } else if (result._discipline === "breaststroke") {
          desciplin = "Bryst";
        } else if (result._discipline === "butterfly") {
          desciplin = "Butterfly";
        } else if (result._discipline === "freestyle") {
          desciplin = "Freestyle";
        } else {
          desciplin = result._discipline;
        }

        // const member = matchResultMember(result.memberId, members);

        const eventType = result.isTraining ? "Træning" : result.isCompetition ? "Stævne" : "Unknown";

        const html = /*html*/ `
    <tr>
      <td>${result.date.toLocaleString("da", {
        day: "numeric",
        month: "short",
        year: "numeric"
      })}</td>
      <td>${result.memberName}</td>
      <td>${desciplin}</td>
      <td>${eventType}</td>
      <td>${result.time}</td>
    </tr>`;

        // console.log(member);

        table.insertAdjacentHTML("beforeend", html);
      }
    }
  };

  return ListRenderer;
}

export { construct };

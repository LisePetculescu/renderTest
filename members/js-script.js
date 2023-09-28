import * as member from "./js-member.js";
import * as result from "./js-result.js";

main();

async function main() {
  await buildMembersList();
  await pushResultsToList();
  displayMembers(members);
  showResults(results);
}

const members = [];

async function fetchMembers() {
  const resp = await fetch("members.json");
  const data = await resp.json();
  return data;
}

async function buildMembersList() {
  const originalObjects = await fetchMembers();

  for (const orgobj of originalObjects) {
    const memberObj = member.construct(orgobj);
    members.push(memberObj);
  }
}

function displayMembers(members) {
  const table = document.querySelector("table#membersTable tbody");
  table.innerHTML = "";
  // console.log(members);
  for (const member of members) {
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

const results = [];

async function fetchResults() {
  const resp = await fetch("results.json");
  const data = await resp.json();
  return data;
}

async function pushResultsToList() {
  const resultsObjects = await fetchResults();

  for (const oldResultObj of resultsObjects) {
    const resultObj = result.construct(oldResultObj);
    results.push(resultObj);
  }
}

function showResults(results) {
  results.sort((a, b) => a.milisecTime - b.milisecTime);

  const table = document.querySelector("table#results tbody");
  table.innerHTML = "";

  for (const result of results) {
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

function matchResultMember(memberId, members) {
  const matchingMember = members.find((member) => member._id === memberId);
  // console.log("Matching Member:", matchingMember);

  return matchingMember;
}

export { matchResultMember, members };

const KEYS = {
  feedbacks: "feedbacks",
  feedbackId: "feedbackId",
};

export const getDepartmentCollection = () => [
  { id: "1", title: "Development" },
  { id: "2", title: "Marketing" },
  { id: "3", title: "Accounting" },
  { id: "4", title: "HR" },
];

export function insertFeedback(data) {
  let feedbacks = getAllFeedbacks();
  data["id"] = generateFeedback();
  feedbacks.push(data);
  localStorage.setItem(KEYS.feedbacks, JSON.stringify(feedbacks));
}

export function updateFeedback(data) {
  let feedbacks = getAllFeedbacks();
  let recordIndex = feedbacks.findIndex((x) => x.id == data.id);
  feedbacks[recordIndex] = { ...data };
  localStorage.setItem(KEYS.feedbacks, JSON.stringify(feedbacks));
}

export function generateFeedback() {
  if (localStorage.getItem(KEYS.feedbackId) == null)
    localStorage.setItem(KEYS.feedbackId, "0");
  var id = parseInt(localStorage.getItem(KEYS.feedbackId));
  localStorage.setItem(KEYS.feedbackId, (++id).toString());
  return id;
}

export function getAllFeedbacks() {
  if (localStorage.getItem(KEYS.feedbacks) == null)
    localStorage.setItem(KEYS.feedbacks, JSON.stringify([]));
  let feedbacks = JSON.parse(localStorage.getItem(KEYS.feedbacks));
  //map departmentID to department title
  let departments = getDepartmentCollection();
  return feedbacks.map((x) => ({
    ...x,
    department: departments[x.departmentId - 1].title,
  }));
}

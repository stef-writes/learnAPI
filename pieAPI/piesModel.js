// Initialize an array to store our pies
// This is a simple in-memory storage solution
// In a real application, you would typically use a database
const pies = ["tomatillo", "cherry"];

// Function to read all pies
const readPies = () => {
  return pies;
};

// Function to create a new pie
const createPie = (flavor) => {
  pies.push(flavor);
};

// Function to update a pie's flavor
const updatePie = (flavor, newFlavor) => {
  const oldPieIndex = pies.findIndex((pie) => pie == flavor);
  pies.splice(oldPieIndex, 1, newFlavor);
};

// Function to delete a pie
const deletePie = (flavor) => {
  const eatenPieIndex = pies.findIndex((pie) => pie == flavor);
  if (eatenPieIndex == -1) {
    throw new Error("no such pie found");
  }
  pies.splice(eatenPieIndex, 1);
};

// Export the functions so they can be used in other files
module.exports = {
  readPies,
  createPie,
  updatePie,
  deletePie,
}; 
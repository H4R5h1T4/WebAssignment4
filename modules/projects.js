// const projectData = require("../data/projectData");
// const sectorData = require("../data/sectorData");

// let projects = [];

// function initialize() {
//   return new Promise((resolve, reject) => {
//     projectData.forEach(projectElement => {
//       let projectWithSector = { ...projectElement, sector: sectorData.find(sectorElement => sectorElement.id == projectElement.sector_id).sector_name }
//       projects.push(projectWithSector);
//     });
//     resolve();
//   });
// }

// function getAllProjects() {
//   return new Promise((resolve, reject) => {
//     resolve(projects);
//   });
// }

// function getProjectById(projectId) {

//   return new Promise((resolve, reject) => {
//     let foundProject = projects.find(p => p.id == projectId);

//     console.log(foundProject);

//     if (foundProject) {
//       resolve(foundProject)
//     } else {
//       reject("Unable to find requested project");
//     }

//   });

// }

// function getProjectsBySector(sector) {

//   return new Promise((resolve, reject) => {
//     let foundProjects = projects.filter(p => p.sector.toUpperCase().includes(sector.toUpperCase()));

//     if (foundProjects) {
//       resolve(foundProjects)
//     } else {
//       reject("Unable to find requested projects");
//     }
//   });

// }


// module.exports = { initialize, getAllProjects, getProjectById, getProjectsBySector }


const projectData = require("../data/projectData");
const sectorData = require("../data/sectorData");

let projects = [];

// Initialize projects by combining projectData and sectorData
function initialize() {
  return new Promise((resolve, reject) => {
    try {
      if (!projectData || !sectorData) {
        return reject("Error: Missing project or sector data.");
      }

      projectData.forEach((projectElement) => {
        const matchingSector = sectorData.find(
          (sectorElement) => sectorElement.id == projectElement.sector_id
        );

        if (matchingSector) {
          projects.push({
            ...projectElement,
            sector: matchingSector.sector_name,
          });
        }
      });

      if (projects.length === 0) {
        reject("Error: No projects found after initialization.");
      } else {
        resolve();
      }
    } catch (err) {
      reject(`Initialization failed: ${err.message}`);
    }
  });
}

// Fetch all projects
function getAllProjects() {
  return new Promise((resolve) => {
    resolve(projects);
  });
}

// Fetch project by ID
function getProjectById(projectId) {
  return new Promise((resolve, reject) => {
    const foundProject = projects.find((p) => p.id == projectId);

    if (foundProject) {
      resolve(foundProject);
    } else {
      reject("Unable to find requested project");
    }
  });
}

// Fetch projects by sector
function getProjectsBySector(sector) {
  return new Promise((resolve, reject) => {
    const foundProjects = projects.filter((p) =>
      p.sector.toUpperCase().includes(sector.toUpperCase())
    );

    if (foundProjects.length > 0) {
      resolve(foundProjects);
    } else {
      reject("Unable to find requested projects");
    }
  });
}

module.exports = { initialize, getAllProjects, getProjectById, getProjectsBySector };

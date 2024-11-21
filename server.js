
//HARSHITA HARSHITA
//142548239


const projectData = require("./modules/projects");
const path = require("path");
const express = require("express");
const app = express();

app.set("view engine", "ejs"); // Set EJS as the view engine
app.set("views", __dirname + "/views"); // Ensure it points to the views directory

const HTTP_PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + "/public"));
app.set("views", __dirname + "/views");

// Home Route
app.get("/", (req, res) => {
  res.render("home", { page: "/" });
});

// About Route
app.get("/about", (req, res) => {
  res.render("about", { page: "/about" });
});

// Projects Route
app.get("/solutions/projects", async (req, res) => {
  try {
    let projects;

    // Check if sector query is provided
    if (req.query.sector) {
      projects = await projectData.getProjectsBySector(req.query.sector);
      if (projects.length === 0) {
        return res.status(404).render("404", { message: "No projects found for the specified sector." });
      }
    } else {
      projects = await projectData.getAllProjects();
    }

    // Render the projects page
    res.render("projects", { page: "/solutions/projects", projects });
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).render("404", { message: "An error occurred while fetching projects." });
  }
});

// Individual Project Route
app.get("/solutions/projects/:id", async (req, res) => {
  try {
    const project = await projectData.getProjectById(req.params.id);
    res.render("project", { page: "", project });
  } catch (err) {
    console.error("Error fetching project:", err);
    res.status(404).render("404", { message: "Project not found." });
  }
});

// 404 Error Handling
app.use((req, res, next) => {
  res.status(404).render("404", { message: "Page not found." });
});

// Initialize and Start Server
projectData
  .initialize()
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log(`server listening on: ${HTTP_PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize project data:", err);
  });

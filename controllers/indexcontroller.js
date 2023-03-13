module.exports = {
  homePage: async (req, res) => {
    res.render("index");
  },

  dashboardPage: async (req, res) => {
    res.render("dashboard", {
      name: req.user.name,
    });
  },
};

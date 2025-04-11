const express = require("express");
const router = express.Router();
const UserDetailController = require("../controllers/userController");

router
  .route("/user-details")
  .get(UserDetailController.getAllUserDetails)
  .post(UserDetailController.createUserDetail);

router
  .route("/user-details/:id")
  .get(UserDetailController.getUserDetailById)
  .patch(UserDetailController.updateUserDetail)
  .delete(UserDetailController.deleteUserDetail);

router
  .route("/user-details/emp/:emp_id") 
  .get(UserDetailController.getUserDetailByEmpId)
  .patch(UserDetailController.updateUserDetailByEmpId); 

router
  .route("/employment/emp/:emp_id") 
  .patch(UserDetailController.updateEmployeeDetailByEmpId); 

router
  .route("/users/status")
  .get(UserDetailController.getUsersByStatus); 

module.exports = router;
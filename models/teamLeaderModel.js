const mongoose = require("mongoose"); 


const teamLeaderSchema = new mongoose.Schema(
  {
    team_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    team_leader_id: {
      type: Number,
      required: true,
    },
    parent_team_leader_id: {
      type: Number,
      required: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    branch_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const TeamLeader = mongoose.model("TeamLeader", teamLeaderSchema);

module.exports = TeamLeader;

const memberService = require('../services/memberService');

exports.createMember = async (req, res) => {
  try {
    const member = await memberService.createMember(req.body);
    res.status(201).json(member);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMemberHistory = async (req, res) => {
  try {
    const member = await memberService.getMemberHistory(req);
    res.json(member);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.getMemberById = async (req, res) => {
  try {
    const member = await memberService.getMemberById(req.params.id);
    res.json(member);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
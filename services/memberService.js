const Member = require('../models/member');
const { v4: uuidv4 } = require('uuid');

class MemberService {
  async createMember(memberData) {
    // Validate input
    if (!memberData.name || !memberData.email || !memberData.phone || !memberData.address) {
      throw new Error('Name, email, phone, and address are required');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(memberData.email)) {
      throw new Error('Invalid email format');
    }

    // Generate UUID if not provided
    const memberToCreate = {
      id: memberData.id || uuidv4(),
      name: memberData.name,
      email: memberData.email,
      phone: memberData.phone,
      address: memberData.address
    };

    return Member.create(memberToCreate);
  }

  async getMemberHistory(searchData) {
    const { status = null, page = 1, limit = 10 } = searchData.body;
    const memId = searchData.params.id;
    const data = {
      status, page, limit, memId
    };
    const member = await Member.history(data);
    if (!member) {
      throw new Error('History not found');
    }
    const totalPages = Math.ceil(member.totalRows / limit);
    return {
      history: member.rows,
      pagination: {
        "total": member.totalRows,
        "page": page,
        "limit": limit,
        "totalPage": totalPages
      }
    };
  }

  async getMemberById(id) {
    const member = await Member.findById(id);
    if (!member) {
      throw new Error('Member not found');
    }
    return member;
  }
}

module.exports = new MemberService();
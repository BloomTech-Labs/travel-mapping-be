
exports.seed = function(knex) {

  // Deletes ALL existing entries
  return knex('test').del()
    .then(function () {

      // Inserts seed entries
      return knex('test').insert([
        { test_id: 0, name: 'John Doe',   title: 'John Doe\'s Test',   description: 'John Doe\'s test data API endpoint awesome',   created_at: knex.fn.now() },
        { test_id: 1, name: 'Jane Smith', title: 'Jane Smith\'s Test', description: 'Jane Smith\'s test data API endpoint awesome', created_at: knex.fn.now() },
      ]);
    });
};

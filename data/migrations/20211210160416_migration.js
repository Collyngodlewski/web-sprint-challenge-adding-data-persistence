
exports.up = async function(knex) {
  await knex.schema 
   .createTable('projects', tbl => {
    tbl.increments('project_id')
    tbl.text('project_name', 128)
        .notNullable()
    tbl.text('project_description', 128)
    tbl.integer('project_completed')
        .defaultTo(0)
        .unsigned()
   })

    .createTable('resources', tbl => {
        tbl.increments('resource_id')
        tbl.text('resource_name', 128)
            .notNullable()
            .unique()
        tbl.text('resource_description', 128)
    })

    .createTable('tasks', tbl =>{
        tbl.increments('task_id')
        tbl.text('task_description', 128)
            .notNullable()
        tbl.text('task_notes', 128)
        tbl.boolean('task_completed')
            .defaultTo(false)
            .unsigned()
        tbl.integer('project_id')
            .unsigned()
            .notNullable()
            .references('project_id')
            .inTable('projects')
            .onDelete('RESTRICT')
            .onUpdate('RESTRICT');
    })

    .createTable('project_resources', tbl =>{
        tbl.increments('project_resources_id')
        tbl.text('resource_assignment', 128)
        tbl.integer('resource_id')
            .notNullable()
            .unsigned()
            .references('resource_id')
            .inTable('resources')
            .onUpdate('RESTRICT')
            .onDelete('RESTRICT')
    })

};

exports.down = async function(knex) {
    await knex.schema
    .dropTableIfExists('project_resources')
    .dropTableIfExists('tasks')
    .dropTableIfExists('resources')
    .dropTableIfExists('projects')
    
};

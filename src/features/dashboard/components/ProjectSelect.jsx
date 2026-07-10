
export function ProjectSelect({ projects, projectField }) {


    return (

        <select className="bg-white"
            id="project_id"
            name="project_id"
            {...projectField}

        >

            <option value={""}> Sin Proyecto</option>

            {projects.map((project) => (
                <option key={project.id} value={project.id}>
                    {project.name}
                </option>
            ))}

        </select>
    )
}
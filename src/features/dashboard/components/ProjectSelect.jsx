
export function ProjectSelect({ projects, onProjecSelected, onHandleProjectSelected }) {


    return (

        <select className="bg-white"
            id="project_id"
            name="project_id"
            value={onProjecSelected}
            onChange={(e) => onHandleProjectSelected(e.target.value)}
        >
            {projects.map((project) => (
                <option key={project.id} value={project.id}>
                    {project.name}
                </option>
            ))}
        </select>
    )
}
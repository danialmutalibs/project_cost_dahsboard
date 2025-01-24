import React, { useEffect, useState } from 'react';
import { IProject } from '../types/Types';
import { getProjects } from '../services/api';
import { Card, CardContent, Typography } from '@mui/material';

const ProjectList: React.FC = () => {
    const [projects, setProjects] = useState<IProject[]>([]);

    useEffect(() => {
        getProjects().then((response) => setProjects(response.data));
    }, []);

    return (
        <div>
            {projects.map((project) => (
                <Card key={project.id}>
                    <CardContent>
                        <Typography variant="h5">{project.name}</Typography>
                        <Typography>Start Date: {project.start_date}</Typography>
                        <Typography>End Date: {project.end_date}</Typography>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default ProjectList;

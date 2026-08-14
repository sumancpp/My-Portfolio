import { Request, Response } from 'express';
import Project from '../models/Project';
import { initialProjectsData } from '../utils/seedData';

export const getProjects = async (req: Request, res: Response) => {
  try {
    let projects = await Project.find().sort({ order: 1, createdAt: -1 });

    // Automatic MongoDB seeding on initial setup if collection is empty
    if (projects.length === 0) {
      console.log('[MongoDB Project Controller] Database collection empty. Seeding initial projects...');
      projects = await Project.insertMany(initialProjectsData);
      console.log(`[MongoDB Project Controller] Successfully seeded ${projects.length} initial projects.`);
    }

    res.json({ success: true, count: projects.length, data: projects });
  } catch (err) {
    res.status(500).json({ success: false, message: (err as Error).message });
  }
};

export const getProjectBySlug = async (req: Request, res: Response) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, message: (err as Error).message });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const {
      title,
      tagline,
      description,
      category,
      featured,
      coverImage,
      images,
      client,
      year,
      role,
      techStack,
      liveUrl,
      githubUrl,
      overview,
      order,
    } = req.body;

    if (!title || !tagline || !description) {
      return res.status(400).json({ success: false, message: 'Title, tagline, and description are required.' });
    }

    let slug = req.body.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    // Check if slug already exists
    const existing = await Project.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const newProject = new Project({
      title,
      slug,
      tagline,
      description,
      category: category || 'Full Stack',
      featured: Boolean(featured),
      coverImage: coverImage || '/project-images/talentai.png',
      images: images || [coverImage || '/project-images/talentai.png'],
      client,
      year: year || new Date().getFullYear().toString(),
      role: role || 'Full Stack Developer',
      techStack: Array.isArray(techStack) ? techStack : [],
      liveUrl,
      githubUrl,
      overview: overview || description,
      order: order || 0,
    });

    const savedProject = await newProject.save();
    return res.status(201).json({
      success: true,
      message: 'Project created successfully in MongoDB Atlas!',
      data: savedProject,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: (err as Error).message });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found in MongoDB.' });
    }

    Object.assign(project, req.body);
    const updatedProject = await project.save();

    return res.json({
      success: true,
      message: 'Project updated successfully in MongoDB Atlas!',
      data: updatedProject,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: (err as Error).message });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ success: false, message: 'Project not found in MongoDB.' });
    }

    return res.json({
      success: true,
      message: 'Project deleted successfully from MongoDB Atlas!',
      data: deletedProject,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: (err as Error).message });
  }
};

export const seedProjects = async (req: Request, res: Response) => {
  try {
    await Project.deleteMany({});
    const seeded = await Project.insertMany(initialProjectsData);
    return res.json({
      success: true,
      message: `Successfully seeded ${seeded.length} projects into MongoDB Atlas.`,
      data: seeded,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: (err as Error).message });
  }
};

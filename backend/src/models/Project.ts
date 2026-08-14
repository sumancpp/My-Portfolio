import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  tagline: string;
  description: string;
  category: 'Full Stack' | 'Frontend' | 'AI / ML' | '3D / WebGL';
  featured: boolean;
  coverImage: string;
  images: string[];
  client?: string;
  year: string;
  role: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  overview: string;
  order: number;
}

const ProjectSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: ['Full Stack', 'Frontend', 'AI / ML', '3D / WebGL'], required: true },
    featured: { type: Boolean, default: false },
    coverImage: { type: String, required: true },
    images: [{ type: String }],
    client: { type: String },
    year: { type: String, required: true },
    role: { type: String, required: true },
    techStack: [{ type: String }],
    liveUrl: { type: String },
    githubUrl: { type: String },
    overview: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IProject>('Project', ProjectSchema);

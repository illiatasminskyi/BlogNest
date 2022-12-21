import { Injectable, Session } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-tag.dto';
import { Posts } from './posts.entity';
import slugify from 'slugify';
import { Users } from 'src/users/users.entity';

interface authorI {
  title: string;
  author: Users;
}

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private readonly repo: Repository<Posts>,
    @InjectRepository(Users) private readonly repoUsers: Repository<Users>,
  ) {}

  async create(createPostDto: CreatePostDto, req) {
    const post = this.repo.create(createPostDto);
    const { title, author, ...data } = post;
    const userId = await this.repoUsers.findOne({
      where: { id: req.user.id },
    } as any);
    const { id, ...user } = userId;
    console.log(user);
    const slug = slugify(title, {
      replacement: '_',
      lower: true,
    });
    const postRes: Posts = {
      title: slug,
      author: { id },
      ...data,
    };
    return this.repo.save(postRes);
  }

  findAll() {
    return this.repo.find({
      relations: {
        category: true,
        author: true,
        // tags: true,
      },
    });
  }

  async findOne(id: number) {
    const post = await this.repo.findOne({
      where: { id },
      relations: {
        category: true,
        // tags: true,
        author: true,
      },
    });
    if (!post) return { message: `Not found post id ${id}` };

    return post;
  }

  async findTitle(title: string) {
    const post = await this.repo.find({
      where: { title: Like(`${title}%`) },
    } as any);
    if (!post) return { message: `Not found post title ${title}` };
    return post;
  }

  async findContent(content: string) {
    const post = await this.repo.find({
      where: { title: Like(`${content}%`) },
    } as any);
    if (!post) return { message: `Not found post title ${content}` };
    return post;
  }

  async findCatrgory(catrgory: string) {
    const post = await this.repo.find({
      where: { catrgory: Like(`${catrgory}%`) },
    } as any);
    if (!post) return { message: `Not found post title ${catrgory}` };
    return post;
  }

  async findTags(tags: string) {
    const post = await this.repo.find({
      where: { tags: Like(`${tags}%`) },
    } as any);
    if (!post) return { message: `Not found post title ${tags}` };
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    await this.repo.update(id, updatePostDto);
    const post = await this.repo.findOne({ where: { id } });
    if (!post) return { message: `Not found post id ${id}` };
    return post;
  }

  async remove(id: number) {
    const post = await this.repo.findOne({ where: { id } });
    if (!post) return { message: `Not found post id ${id}` };
    return await this.repo.delete(id);
  }
}

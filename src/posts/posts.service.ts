import { Injectable } from '@nestjs/common';
import { InjectRepository, getRepositoryToken } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-tag.dto';
import { Posts } from './posts.entity';
import slugify from 'slugify';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private readonly repo: Repository<Posts>,
  ) {}

  create(createPostDto: CreatePostDto) {
    const post = this.repo.create(createPostDto);
    const { title, ...data } = post;
    const slug = slugify(title, {
      replacement: '_',
      lower: true,
    });
    const postRes = {
      title: slug,
      ...data,
    };
    return this.repo.save(postRes);
  }

  findAll() {
    return this.repo.find({
      relations: {
        category: true,
        tags: true,
      },
    });
  }

  async findOne(id: number) {
    const post = await this.repo.findOne({
      where: { id },
      relations: {
        category: true,
        tags: true,
      },
    });
    if (!post) return { message: `Not found post id ${id}` };

    return post;
  }

  async findOneTitle(title: string) {
    const post = await this.repo.findOneBy({ title });

    // findOne({
    //   where: { title },
    //   relations: {
    //     category: true,
    //     tags: true,
    //   },
    // });
    if (!post) return { message: `Not found post title ${title}` };

    return post;
  }

  // async update(id: number, updatePostDto: UpdatePostDto) {
  //   await this.repo.update(id, updatePostDto);
  //   const post = await this.repo.findOne({ where: { id } });
  //   if (!post) return { message: `Not found post id ${id}` };
  //   return post;
  // }

  async remove(id: number) {
    const post = await this.repo.findOne({ where: { id } });
    if (!post) return { message: `Not found post id ${id}` };
    return await this.repo.delete(id);
  }
}

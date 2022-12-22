import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-tag.dto';
import { Posts } from './posts.entity';
import { Users } from 'src/users/users.entity';
import { Categories } from 'src/category/categories.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { Status } from './status.enum';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private readonly repoPosts: Repository<Posts>,
    @InjectRepository(Users) private readonly repoUsers: Repository<Users>,
    @InjectRepository(Categories)
    private readonly repoCategories: Repository<Categories>,
    @InjectRepository(Tag)
    private readonly repoTags: Repository<Tag>,
  ) {}

  async create(createPostDto: CreatePostDto, req) {
    const newPosts = new Posts();
    const post = this.repoPosts.create(createPostDto);

    const { title, content, status, author, category, ...data } = post;
    const userId = await this.repoUsers.findOne({
      where: { id: req.user.id },
    } as any);
    const { id } = userId;

    const tagArr = [];
    createPostDto.tags.map((tag) => {
      const tagId = {
        title: tag,
      };
      tagArr.push(tagId);
    });
    const postCatrgory = await this.repoCategories.findBy({
      title: category,
    } as any);
    if (!tagArr.length) return { message: `Not found tag tag` };
    newPosts.tags = await this.repoTags.findBy(tagArr);
    newPosts.title = title;
    newPosts.category = postCatrgory[0];
    newPosts.content = content;
    newPosts.status = status;
    newPosts.author = { id };
    return this.repoPosts.save(newPosts);
  }

  async findAll() {
    return this.repoPosts.find({
      relations: {
        category: true,
        author: true,
        tags: true,
      },
    });
  }

  async findOne(id: number) {
    const post = await this.repoPosts.findOne({
      where: { id },
      relations: {
        category: true,
        tags: true,
        author: true,
      },
    });
    if (!post) return { message: `Not found post id ${id}` };

    return post;
  }

  async findTitle(title: string) {
    const post = await this.repoPosts.find({
      where: { title: Like(`${title}%`) },
    } as any);
    if (!post) return { message: `Not found post title ${title}` };
    return post;
  }

  async findContent(content: string) {
    const post = await this.repoPosts.find({
      where: { content: Like(`${content}%`) },
    } as any);
    if (!post) return { message: `Not found post title ${content}` };
    return post;
  }

  async findCatrgory(catrgory: string) {
    const postCatrgory = await this.repoCategories.find({
      where: { title: Like(`${catrgory}%`) },
      relations: {
        posts: true,
      },
    });
    return postCatrgory;
  }

  async findTags(tags: string) {
    const postTag = await this.repoTags.find({
      where: { title: Like(`${tags}%`) },
      relations: {
        posts: true,
      },
    });
    return postTag;
  }

  async update(id: number, updatePostDto: UpdatePostDto, req) {
    const post = await this.repoPosts.findOne({
      where: { id },
      relations: {
        author: true,
      },
    });
    if (!post) return { message: `Not found post id ${id}` };
    if (!post.author.facebookId === req.user.facebookId)
      return { message: `No access` };

    const { category, status, ...data } = updatePostDto;

    const postCatrgory = await this.repoCategories.findBy({
      title: category,
    } as any);

    const dataRes = {
      category: postCatrgory[0],
      status: Status.Edited,
      ...data,
    };
    await this.repoPosts.update(id, dataRes);
    // const post = await this.repoPosts.findOne({ where: { id } });
    // if (!post) return { message: `Not found post id ${id}` };
    return dataRes;
  }

  async remove(id: number) {
    const post = await this.repoPosts.findOne({ where: { id } });
    if (!post) return { message: `Not found post id ${id}` };
    return await this.repoPosts.delete(id);
  }
}

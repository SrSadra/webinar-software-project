import { CloudinaryService } from '@app/shared/cloudinary/cloudinary.service';
import { newEpisodeDto } from '@app/shared/dtos/newEpisode.dto';
import { newTeacherDto } from '@app/shared/dtos/newTeacher.dto';
import { newWebinarDto } from '@app/shared/dtos/newWebinar.dto';
import { updateWebinarDto } from '@app/shared/dtos/updateWebinar.dto';
import { EpisodeEntity } from '@app/shared/entities/episode.entity';
import { ProfileEntity } from '@app/shared/entities/profile.entity';
import { SubCategoryEntity } from '@app/shared/entities/subCategory.entity';
import { webinarEntity } from '@app/shared/entities/webinar.entity';
import { WebinarCategoryEntity } from '@app/shared/entities/webinarCategory.entity';
import { webinarStatus } from '@app/shared/enums/webinarStatus.enum';
import { MulterFile } from '@app/shared/interfaces/multer.interface';
import { webinarRepository } from '@app/shared/interfaces/repos/webinar.repository';
import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { firstValueFrom, timeout } from 'rxjs';
import { In } from 'typeorm';

@Injectable()
export class WebinarService {
    constructor(private readonly cloudinarySer : CloudinaryService,
        @Inject("CATEGORY_SERVICE") private readonly categorySer: ClientProxy,
        @Inject("EPISODE_SERVICE") private readonly episodeSer: ClientProxy,
        @Inject("USER_SERVICE") private readonly userSer: ClientProxy,
         private readonly webinarRep : webinarRepository,
         private readonly config : ConfigService){}

    async createWebinar(createDto : newWebinarDto, file : MulterFile, req : Request){
        const manager = req.user;
        if (!manager){
            throw new NotFoundException("Manager is not exist!");
        }
        
        const {categoryName, subCategoryNames} = createDto;
        console.log(categoryName);
        const $ob = this.categorySer.send<WebinarCategoryEntity[]>({cmd: "find-category-by-title"}, {title: categoryName});
        const category: WebinarCategoryEntity[] | void = await firstValueFrom($ob).catch((err) => console.log(err));
        if (!category){
            throw new NotFoundException("Category name not found!");
        }
        const foundedCategory = category[0];
        const $ob2 = this.categorySer.send<SubCategoryEntity[]>({cmd:"find-all-sub-by-title" }, {subcategories: subCategoryNames});
        let subcategories = await firstValueFrom($ob2).catch((err) => console.log(err));
        if (!subcategories){
            subcategories = [];
        }
        const invitationLink = this.createWebinarLink();
        console.log("title", foundedCategory);
        const uploadedFile = await this.cloudinarySer.uploadFile(file,`webinarcover/${createDto.englishTitle}`);
        console.log(invitationLink);
        const webinar = this.webinarRep.create({
            ...createDto,
            category: foundedCategory,
            subcategories, 
            invitationLink,
            image: uploadedFile.url,
            creator: manager,
            transactions: [],
            participants: [],
            episodes: []
        });
        console.log(webinar);
        await this.webinarRep.save(webinar);
    }

    async addTeacher(username : newTeacherDto, id: number){
        const webinar = await this.webinarRep.findById(id);
        if (!webinar){
            throw new NotFoundException("This webinar doesnt exist!");
        }
        const $ob = this.userSer.send({cmd: "get-profile"}, { username: username.username});
        const foundedTeacher: ProfileEntity = await firstValueFrom($ob).catch((err) => err);
        console.log("be teacher", foundedTeacher);
        if (!foundedTeacher){
            throw new NotFoundException("This User profile doesnt exist!");
        }
        webinar.teacher = foundedTeacher;
        return await this.webinarRep.save(webinar);
    }

    createWebinarLink(): string{
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < 5) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        console.log(result);
        const webinarRoute = this.config.get("WEBINAR_ROUTE");
        const link = webinarRoute + result;
        return link;
    }

    async addEpisode(newEpisode: newEpisodeDto, webinarId: number){
        try{
            const webinar = await this.webinarRep.findById(webinarId);
            if (webinar){
                console.log({cmd: "create-episode"}, newEpisode);
                const $ob = this.episodeSer.send({cmd: "create-episode"}, {newEpisode: newEpisode,webinar});
                return firstValueFrom($ob).catch((err) => err);
            }
            else{
                throw new NotFoundException("This webinar doesnt exist!");
            }
        }catch (err){
            console.log(err);
            throw new err;
        }
    }

    async updateWebinar(updateWebinarDto: updateWebinarDto, id: number): Promise<webinarEntity> {
        const {categoryName, subCategoryNames} = updateWebinarDto;
        try{
            const webinar = await this.webinarRep.findById(id);
            if (!webinar) {
            throw new NotFoundException(`Webinar with ID ${id} not found.`);
            }
        
            // Update fields as needed, respecting optionality
            if (updateWebinarDto.persianTitle) {
            webinar.persianTitle = updateWebinarDto.persianTitle;
            }
            if (updateWebinarDto.englishTitle) {
            webinar.englishTitle = updateWebinarDto.englishTitle;
            }
            if (updateWebinarDto.status) {
            webinar.status = updateWebinarDto.status;
            }
            if (updateWebinarDto.description) {
            webinar.description = updateWebinarDto.description;
            }
            if (updateWebinarDto.price) {
            webinar.price = updateWebinarDto.price;
            }
            if (updateWebinarDto.discountPercent) {
            webinar.discountPercent = updateWebinarDto.discountPercent;
            }
            if (updateWebinarDto.onlyDoctor !== undefined) {
            webinar.onlyDoctor = updateWebinarDto.onlyDoctor;
            }
            if (updateWebinarDto.categoryName) {
            const $ob = this.categorySer.send<WebinarCategoryEntity>({cmd: "find-category-by-title"}, {title: categoryName});
            const category: WebinarCategoryEntity = await firstValueFrom($ob).catch((err) => err);
            if (!category) {
                throw new NotFoundException(`Category ${categoryName} not found.`);
            }
            webinar.category = category;
            }
            if (subCategoryNames && subCategoryNames.length > 0) {
            // Here we assume subcategories are added by name, adjust for ID or other logic
            const $ob2 = this.categorySer.send<SubCategoryEntity[]>({cmd: "find-all-sub-by-title"}, {subcategories: subCategoryNames} );
            const foundedSub = await firstValueFrom($ob2).catch((err) => err);
            if (!foundedSub){
                throw new NotFoundException(`These ${subCategoryNames} not found.`);
            }
            webinar.subcategories = foundedSub;
            }
        
            // Save the updated webinar
            return await this.webinarRep.save(webinar);
        }catch (err){
            console.log(err);
            throw new err;
        }
      }


      async searchWebinar(
        page: number = 1,
        perPage: number = 8,
        status?: string,
        onlyDoctor?: boolean,
        title?: string,
        category?: string,
      ) {
        
        const queryBuilder = this.webinarRep.createquerybuilder('webinars');
    
        // Filter by status
        if (status) {
          queryBuilder.andWhere('webinars.status = :status', { status });
        }
    
        // Filter by onlyDoctor flag
        if (onlyDoctor !== undefined) {
          console.log("only doctor",onlyDoctor);
          
          queryBuilder.andWhere('webinars.onlyDoctor = :onlyDoctor', { onlyDoctor });
        }
    
        // Filter by title (partial match)
        if (title) {
          queryBuilder.andWhere('webinars.englishTitle LIKE :title', { title: `%${title}%` });
        }
    
        // Filter by category
        if (category) {
          try {
            const $ob = this.categorySer.send<WebinarCategoryEntity>(
              { cmd: "find-category-by-title" },
              { title: category }
            );
            const categoryEntity = await firstValueFrom($ob);
            
            if (categoryEntity) {
              queryBuilder.andWhere('webinars.categoryId = :categoryId', { categoryId: categoryEntity.id });
            }
          } catch (err) {
            console.error("Category fetch error:", err);
          }
        }
    
        // Pagination
        const totalWebinars = await queryBuilder.getCount();
        queryBuilder.skip((page - 1) * perPage).take(perPage);
    
        const webinars = await queryBuilder.getMany();
        const totalPages = Math.ceil(totalWebinars / perPage);
        console.log(webinars);
        
        return {
          webinars,
          currentPage: page,
          perPage,
          totalWebinars,
          totalPages,
        };
      }
    

      async getWebinar(slug: string){
        console.log("here");
        
        const webinar = await this.webinarRep.getExactWebinarSafe(slug);
        if (!webinar){
            throw new NotFoundException("No webinar founded");
        }
        console.log(webinar);
        const $ob = this.episodeSer.send<EpisodeEntity[]>({cmd: "find-webinar-episodes"}, {webinar}).pipe(timeout(10000)); // Timeout after 5 seconds
        let episodes: EpisodeEntity[] = await firstValueFrom($ob).catch((err) => err);
        if (!episodes){
            episodes = [];
        }
        
        if (!Array.isArray(episodes)) {
          episodes = [episodes]; // Convert single JSON object to an array
        }
        return {webinar, episodes};
      }

      async getWebinarBySlug(slug: string){
        const webinar = await this.webinarRep.getWebinarForPurchase(slug);
        if (!webinar){
            throw new NotFoundException("No webinar founded");
        }
        return webinar
      }

      async addParticipantWebinar(id: number, profile: ProfileEntity){
        const webinar = await this.webinarRep.findByCondition({
            where: {id},
            relations : ["participants"]
        })
        if (!webinar){
            throw new NotFoundException("No webinar founded");
        }
        console.log("webinar here" , webinar);
        webinar.participants.push(profile);
        await this.webinarRep.save(webinar);
        return webinar;
      }


      async getFeaturedProducts(): Promise<webinarEntity[]> {
        try {
          return await this.webinarRep.findAll({
            take: 3, // Limit the results to 3
            order: { id: 'DESC' } // Optional: Order by newest first
        });
        } catch (error) {
          console.error('Error fetching featured products:', error);
          throw new InternalServerErrorException('Error fetching featured products');
        }
      }


    async getWebinarParticipants(webinarId: number): Promise<ProfileEntity[]> {
      const webinar = await this.webinarRep.findByCondition({
        where: { id: webinarId },
        relations: ['participants', 'participants.user'], // Load participants relation
      });
  
      if (!webinar) {
        throw new NotFoundException('Webinar not found');
      }
  
      return webinar.participants;
    }
  
  }





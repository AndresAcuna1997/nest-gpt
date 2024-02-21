import {Injectable} from '@nestjs/common';
import {orthographyUseCase} from './use-cases';
import {OrthographyDto} from './dtos';
import OpenAI from 'openai';

@Injectable()
export class GptService {
  private openAI = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

  async orthographyCheck(orthographyDto: OrthographyDto) {
    return await orthographyUseCase(this.openAI, {
      prompt: orthographyDto.prompt,
    });
  }
}

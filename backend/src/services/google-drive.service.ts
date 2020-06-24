import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

import { slides_v1 as SlidesV1 } from 'googleapis';
import { google } from 'googleapis';

import { OAuth2Client } from 'google-auth-library';

import { folderThemesId } from '../util/google.constants';
import { Presentation } from '@model/presentation';
import { Theme } from '@model/theme';

@Injectable()
export class GoogleDriveService {

  constructor(
    private configService: ConfigService
  ) { }

  async createPresentation(presentation: Presentation) {

    const slides = google.slides({
      version: 'v1',
      auth: this.configService.get('GOOGLE_API_KEY')
    });

    const googleOauth = this.getGoogleOAuth2Client(presentation.user.googleAccessToken);

    const copyPresentation = await google.drive('v3').files
      .copy({
        requestBody: { parents: ['root'], name: presentation.term },
        auth: googleOauth,
        fileId: presentation.theme.googleIdPresentation,
      });

    presentation.idGoogle = copyPresentation.data.id;

    const slidesCreated = this.createSlides(presentation);
    slidesCreated.push(
      {
        replaceAllText: {
          replaceText: presentation.cover.title,
          containsText: { text: '{{TITLE}}' }
        }
      },
      {
        replaceAllText: {
          replaceText: presentation.cover.subTitle,
          containsText: { text: '{{SUB_TITLE}}' }
        }
      }
    );

    if (presentation.thankSlide) {
      slidesCreated.push({
        createSlide: {
          objectId: `thank_slide_1`,
          slideLayoutReference: {
            predefinedLayout: 'TITLE_ONLY'
          },
          placeholderIdMappings: [
            {
              objectId: `thank_slide_title_1`,
              layoutPlaceholder: {
                type: 'TITLE'
              },
            },
          ]
        },
      });
      slidesCreated.push({
        insertText: {
          objectId: `thank_slide_title_1`,
          text: `Obrigado!`
        }
      });
    }

    await slides.presentations.batchUpdate({
      auth: googleOauth,
      presentationId: presentation.idGoogle,
      requestBody: { requests: slidesCreated }
    });

  }

  async getPresentationByIdGoogle(idGoogle: string, userAccessToken: string) {

    const googleOauth = this.getGoogleOAuth2Client(userAccessToken);
    const presentation = await google.drive('v3').files.get({
      fileId: idGoogle,
      auth: googleOauth
    });

    console.log('presentation');
    return presentation;
  }

  getAllThemes(): Promise<any> {
    return google.drive('v3').files.list({
      auth: this.configService.get('GOOGLE_API_KEY'),
      fields: 'files(*)',
      q: `'${folderThemesId}' in parents`
    }).then(responseGoogle => responseGoogle.data.files.map(f => f.id));
  }

  async getAllPresentations(): Promise<any> {
    return await google.drive('v3').files.list({
      auth: this.configService.get('GOOGLE_API_KEY'),
      fields: 'files(*)',
      q: `'18h4BYqMZaZtINBE4CLk_DCcWuAwb__j0' in parents`
    }).then((responseGoogle): Array<Theme> => {
      return responseGoogle.data.files.map(f => (
        {
          name: f.name,
          googleIdPresentation: f.id,
          googleIdImg: '',
        }
      ));
    });

  }

  async deletePresentation(presentation: Presentation) {
    const auth = this.getGoogleOAuth2Client(presentation.user.googleAccessToken);
    await google.drive('v3').files
      .delete({
        auth,
        fileId: presentation.idGoogle,
      });
  }

  private getGoogleOAuth2Client(googleAccessToken: string): OAuth2Client {
    const googleOauth = new OAuth2Client({
      clientId: this.configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: this.configService.get('GOOGLE_CLIENT_SECRET'),
    });

    googleOauth.setCredentials({ access_token: googleAccessToken });

    return googleOauth;
  }

  private createSlides(presentation: Presentation): Array<any> {
    const ID_TITLE_SLIDE = 'id_title_slide';
    const ID_TITLE_SLIDE_TITLE = 'id_title_slide_title';
    const ID_TITLE_SLIDE_BODY = 'id_title_slide_body';

    return presentation.textSentences.map((txs, index): SlidesV1.Schema$Request[] => {

      const slides: Array<SlidesV1.Schema$Request> = [
        {
          createSlide: {
            objectId: `${ID_TITLE_SLIDE}_${index}`,
            slideLayoutReference: {
              predefinedLayout: 'TITLE_AND_BODY'
            },
            placeholderIdMappings: [
              {
                objectId: `${ID_TITLE_SLIDE_TITLE}_${index}`,
                layoutPlaceholder: {
                  type: 'TITLE'
                },
              },
              {
                objectId: `${ID_TITLE_SLIDE_BODY}_${index}`,
                layoutPlaceholder: {
                  type: 'BODY'
                },
              }
            ]
          },
        },
        {
          insertText: {
            objectId: `${ID_TITLE_SLIDE_TITLE}_${index}`,
            text: `${presentation.term}`
          }
        },
        {
          insertText: {
            objectId: `${ID_TITLE_SLIDE_BODY}_${index}`,
            text: `${txs.text}`
          }
        },
      ];

      if (txs?.images?.length) {
        slides.push({
          createImage: {
            objectId: `${ID_TITLE_SLIDE}_${index}_img`,
            url: txs.images[0],
            elementProperties: {
              pageObjectId: `${ID_TITLE_SLIDE}_${index}`,
              size: {
                height: {
                  magnitude: 2000000,
                  unit: 'EMU',
                },
                width: {
                  magnitude: 2000000,
                  unit: 'EMU',
                },
              },
              transform: {
                scaleX: 1,
                scaleY: 1,
                translateX: 6300000,
                translateY: 3000000,
                unit: 'EMU'
              }

            },
          }
        });
      }

      return slides;

    });

  }
}

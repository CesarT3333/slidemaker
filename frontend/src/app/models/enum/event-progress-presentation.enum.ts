export enum EventProgressPresentationEnum {
  FETCH_CONTENT_WIKIPEDIA = 'FETCH_CONTENT_WIKIPEDIA',
  READ_TEXT_USER = 'READ_TEXT_USER',
  CLEAN_TEXT = 'CLEAN_TEXT',
  SENTENCES_DETECTION = 'SENTENCES_DETECTION',
  IDENTIFYING_KEYWORDS = 'IDENTIFYING_KEYWORDS',
  SEARCHING_IMAGE = 'SEARCHING_IMAGE'
}

export namespace EventProgressPresentationEnum {
  export const getDescription =
    (eventProgressPresentationEnum: EventProgressPresentationEnum): string => {

      switch (eventProgressPresentationEnum) {
        case EventProgressPresentationEnum.FETCH_CONTENT_WIKIPEDIA:
          return 'Estamos buscando o conteúdo da Wikipedia';

        case EventProgressPresentationEnum.READ_TEXT_USER:
          return 'Estamos Lendo o seu texto';

        case EventProgressPresentationEnum.CLEAN_TEXT:
          return 'Estamos limpando o conteúdo da sua apresentação';

        case EventProgressPresentationEnum.SENTENCES_DETECTION:
          return 'Estamos detectando seus slides';

        case EventProgressPresentationEnum.IDENTIFYING_KEYWORDS:
        case EventProgressPresentationEnum.SEARCHING_IMAGE:
          return 'Estamos baixando as imagens para sua apresentação';

        default:
          return 'Estamos montando sua apresentação';
      }
    };
}

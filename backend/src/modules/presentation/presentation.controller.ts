import { Controller, Get, UseGuards } from '@nestjs/common';

import { resources } from '../../util/resources';

@Controller(resources.PRESENTATIONS)
export class PresentationController {

}

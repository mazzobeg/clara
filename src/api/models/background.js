import json from '@/assets/newApi/backgrounds.json'
import { Backgrounds } from '@/api/typeNew.js'

export const PROTOTYPE = Backgrounds.fromJson(json)['elements'];
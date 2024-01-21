import json from '@/assets/newApi/classes.json'
import { Classes } from '@/api/typeNew.js'

export const PROTOTYPE = Classes.fromJson(json)['elements'];
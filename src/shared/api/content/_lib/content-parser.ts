import { DataValidateError, ParsingError } from '@front/shared/lib/errors'
import Ajv from 'ajv'
import * as Yaml from 'yaml'

export class ContentParser {
	private ajv = new Ajv({
		strict: false
	})

	async parse<T>(text: string, schema: object) {
		try {
			const resultObject: unknown = await Yaml.parse(text)

			if (this.ajv.validate(schema, resultObject)) {
				return resultObject as T
			} else {
				throw new DataValidateError([...(this.ajv.errors ?? [])])
			}
		} catch (error) {
			throw new ParsingError(text, 'ContentParsing error', error)
		}
	}
}

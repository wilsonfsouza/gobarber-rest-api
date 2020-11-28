import handlebars from 'handlebars';
import fs from 'fs';
import IParseEmailTemplateDTO from '../dtos/IParseEmailTemplateDTO';
import IEmailTemplateProvider from '../models/IEmailTemplateProvider';

class HandlebarsEmailTemplateProvider implements IEmailTemplateProvider {
  public async parse({
    file,
    variables,
  }: IParseEmailTemplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}

export default HandlebarsEmailTemplateProvider;

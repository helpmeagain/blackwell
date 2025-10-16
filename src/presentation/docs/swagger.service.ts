import { INestApplication, Injectable } from '@nestjs/common';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { name, description, version, homepage } from '../../../package.json';
import * as fs from 'fs';

@Injectable()
export class SwaggerService {
  createDocument(app: INestApplication<unknown>) {
    const config = new DocumentBuilder()
      .setTitle(name.charAt(0).toUpperCase() + name.slice(1))
      .setDescription(description)
      .setVersion(version)
      .setLicense(
        'Apache License 2.0',
        'https://github.com/helpmeagain/blackwell/blob/main/LICENSE.txt',
      )
      .setExternalDoc('Source code', homepage)
      .addBearerAuth()
      .addServer('http://localhost:8080', 'Localhost')
      .addServer('http://localhost:3000', 'Localhost')
      .addServer('https://blackwell.onrender.com', 'Production')
      .build();
    const options: SwaggerDocumentOptions = {
      autoTagControllers: false,
    };
    const document = SwaggerModule.createDocument(app, config, options);
    SwaggerModule.setup('api', app, document, {
      jsonDocumentUrl: 'api-json',
      swaggerOptions: {
        tagsSorter: 'alpha',
        operationsSorter: function (
          a: { get: (arg0: string) => string },
          b: { get: (arg0: string) => string },
        ) {
          const order = {
            get: '0',
            post: '1',
            patch: '2',
            put: '3',
            delete: '4',
            head: '5',
            options: '6',
            connect: '7',
            trace: '8',
          };
          return (
            order[a.get('method')].localeCompare(order[b.get('method')]) ||
            a.get('path').localeCompare(b.get('path'))
          );
        },
      },
    });
    fs.writeFileSync('./docs/swagger.json', JSON.stringify(document));
  }
}

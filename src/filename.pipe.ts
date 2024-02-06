import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { union } from 'lodash';

const fileItem = {
  fieldname: 'file',
  originalname: 'new-logo.png',
  encoding: '7bit',
  mimetype: 'image/png',
  destination: '/Users/hulongchao/Documents/code/2024/nest-hello/uploads',
  filename: 'file-1707214753138-582787286-new-logo.png',
  path: '/Users/hulongchao/Documents/code/2024/nest-hello/uploads/file-1707214753138-582787286-new-logo.png',
  size: 25871,
} as const;

const keys = Reflect.ownKeys(fileItem);

@Injectable()
export class FilenameEncodePipe implements PipeTransform {
  transform(value, metadata: ArgumentMetadata) {
    const list = Array.isArray(value) ? value : [value];
    const isFileList = list.every((item) => {
      return (
        typeof item === 'object' &&
        item !== null &&
        Reflect.ownKeys(item).length === keys.length &&
        union(Reflect.ownKeys(item), keys).length === keys.length
      );
    });
    if (!isFileList) return value;

    // 只对文件进行处理
    const list2 = list as Express.Multer.File[];
    list2.forEach((item) => {
      item.originalname = Buffer.from(value.originalname, 'latin1').toString(
        'utf8',
      );
    });

    return value;
  }
}

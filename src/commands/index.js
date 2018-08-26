import user from './user';
import download from './download';
import unknown from './unknown';

const commands = [
  user,
  download,
  unknown
];

export default function (program) {
  for (const cmd of commands) {
    cmd(program);
  }
}

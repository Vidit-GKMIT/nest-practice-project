import { departmentSeed } from './seeds/department.seed';
import { AppDataSource } from '../data-source';

const runDepartmentSeed = async () => {
  await AppDataSource.initialize();
  const data = await departmentSeed(AppDataSource);
  await AppDataSource.destroy();
  return data;
};

runDepartmentSeed()
  .then((insertedData) => console.log('Data added', insertedData))
  .catch((err) => console.log('Data insertion failed', err));

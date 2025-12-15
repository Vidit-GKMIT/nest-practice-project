import { DataSource } from 'typeorm';
import { Department } from '../../department/entities/department.entity';

export async function departmentSeed(datasource: DataSource) {
  const data = [
    { name: 'HR' },
    { name: 'Technical' },
    { name: 'Digital-Marketing' },
    { name: 'Non-Technical' },
  ];
  const insertedData = await datasource
    .createQueryBuilder()
    .insert()
    .into(Department)
    .values(data)
    .execute();

  return insertedData;
}

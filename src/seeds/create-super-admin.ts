// import { DataSource } from 'typeorm';
// import * as bcrypt from 'bcrypt';
// import { Admin } from '../admin/entities/admin.entity';

// export const createSuperAdmin = async (dataSource: DataSource) => {
//   const repo = dataSource.getRepository(Admin);

//   const existing = await repo.findOne({ where: { email: 'super@admin.com' } });
//   if (existing) {
//     console.log('⚠️ Super admin already exists');
//     return;
//   }

//   const hashedPassword = await bcrypt.hash('SuperAdmin123!', 10);

//   const superAdmin = repo.create({
//     username: 'Super Admin',
//     email: 'super@admin.com',
//     password: hashedPassword,
//     is_creator: true,
//     is_active: true,
//   });

//   await repo.save(superAdmin);
//   console.log('✅ Super admin created successfully!');
// };

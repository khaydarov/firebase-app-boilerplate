import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { getFirestore } from '../../infrastructure/firebase';
import { Timestamp } from 'firebase-admin/firestore';

@Controller('resource')
export class ResourceController {
  @Post('/')
  async create(@Body() body: any) {
    const { title, description } = body;
    const db = getFirestore();
    const docRef = await db.collection('resource').add({
      title,
      description,
      created_at: Timestamp.now(),
    });

    return {
      id: docRef.id,
    };
  }

  @Get('/')
  async findAll() {
    const db = getFirestore();
    const snapshot = await db.collection('resource').get();
    const resources = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return resources;
  }

  @Get('/:id')
  async findOne(@Param() params: any) {
    const { id } = params;
    const db = getFirestore();
    const doc = await db.collection('resource').doc(id).get();

    if (!doc.exists) {
      return {};
    }

    return {
      id: doc.id,
      ...doc.data(),
    };
  }
}

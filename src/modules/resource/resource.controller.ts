import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { getFirestore } from '../../infrastructure/firebase';
import { Timestamp } from 'firebase-admin/firestore';
import { FirebaseAuthGuard } from '../auth/auth.guard';

@Controller('resource')
export class ResourceController {
  @Post('/')
  @UseGuards(FirebaseAuthGuard)
  async create(@Request() req, @Body() body: any) {
    const { title, description } = body;
    const { user } = req;
    const db = getFirestore();
    const docRef = await db.collection('resource').add({
      title,
      description,
      creatorId: user.id,
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

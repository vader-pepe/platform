import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { getConfig } from './common/config'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.setGlobalPrefix(getConfig('API_VERSION'))
    await app.listen(3000)
}
bootstrap()

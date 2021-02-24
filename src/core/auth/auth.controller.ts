import { Post, UseGuards, Request, Controller, Get } from "@nestjs/common";
import { ApiBody, ApiHeader, ApiTags } from "@nestjs/swagger";
import { AuthService, ReToken } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { LocalAuthGuard } from "./local-auth.guard";

@ApiTags("验证auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {
}

  // 登录
  @ApiBody({
    type: "string",
    schema: {
      example: {
        username: "",
        password: ""
      }
    }
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any): Promise<ReToken> {
    return this.authService.login(req.user)
  }

  // 用户信息
  @ApiHeader({
    name: "Authorization",
    description: "Bearer "
  })
  @UseGuards(JwtAuthGuard)
  @Get("userInfo")
  async getUserInfo(@Request() req: any): Promise<any> {
    return req.user;
  }
}
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Este é um mock simples para simular a autenticação.
// Em uma aplicação real, você obteria o papel do usuário de um token JWT, sessão, etc.
const getUserRole = (request: NextRequest): string | null => {
  // Exemplo: ler um cookie ou cabeçalho de autorização
  const userToken = request.cookies.get('user_token')
  if (userToken && userToken.value === 'admin_token') {
    return 'admin'
  } else if (userToken && userToken.value === 'participante_token') {
    return 'participante'
  }
  return null // Ou 'guest' para usuários não autenticados
}

export function middleware(request: NextRequest) {
  const userRole = getUserRole(request)
  const pathname = request.nextUrl.pathname

  // Rotas que exigem autenticação (todas dentro de (private))
  if (pathname.startsWith('/app/(private)')) {
    // Se o usuário não estiver autenticado, redireciona para a página de login
    if (!userRole) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Restrição para a página de feedback: apenas admin pode acessar
    if (pathname.startsWith('/app/(private)/feedback') && userRole !== 'admin') {
      return NextResponse.redirect(new URL('/app/(private)/events', request.url)) // Redireciona para eventos ou outra página permitida
    }

    // Redireciona participantes do dashboard para a página de eventos
    if (pathname.startsWith('/app/(private)/dashboard') && userRole === 'participante') {
      return NextResponse.redirect(new URL('/app/(private)/events', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/app/(private)/:path*'], // Aplica o middleware a todas as rotas dentro de (private)
}

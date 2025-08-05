from fastapi import FastAPI, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import json
import os
from datetime import datetime, timedelta
import random
from typing import Optional

app = FastAPI()

# Modelos Pydantic para validação de dados
class PlanData(BaseModel):
    name: str
    max_concurrents: int
    max_seconds: int
    min_seconds: int
    premium: bool
    api_access: bool

class UserData(BaseModel):
    username: str
    email: str
    password: str
    is_admin: bool = False

# Permitir CORS para o frontend rodando em qualquer porta do localhost
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todas as origens em desenvolvimento
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dados simulados para os endpoints faltantes
mock_attacks = []
mock_methods = [
    {"name": "HTTP-FLOOD", "layer": "Layer7", "premium": False, "amplification": False, "proxy": False},
    {"name": "UDP-FLOOD", "layer": "Layer4", "premium": False, "amplification": False, "proxy": False},
    {"name": "TCP-FLOOD", "layer": "Layer4", "premium": False, "amplification": False, "proxy": False},
    {"name": "SYN-FLOOD", "layer": "Layer4", "premium": True, "amplification": False, "proxy": True},
    {"name": "DNS-AMP", "layer": "Layer4", "premium": True, "amplification": True, "proxy": True}
]

mock_plans = [
    {"name": "Basic", "max_concurrents": 100, "max_seconds": 300, "min_seconds": 30, "premium": False, "api_access": False},
    {"name": "Premium", "max_concurrents": 500, "max_seconds": 600, "min_seconds": 30, "premium": True, "api_access": True},
    {"name": "Enterprise", "max_concurrents": 1000, "max_seconds": 1200, "min_seconds": 30, "premium": True, "api_access": True}
]

# Funções para gerenciar usuários
def load_users():
    """Carrega usuários do arquivo JSON"""
    if os.path.exists("users.json"):
        with open("users.json", "r") as f:
            return json.load(f)
    return {"users": []}

def save_users(users_data):
    """Salva usuários no arquivo JSON"""
    with open("users.json", "w") as f:
        json.dump(users_data, f, indent=2)

def find_user(username):
    """Encontra um usuário pelo username"""
    users_data = load_users()
    for user in users_data["users"]:
        if user["username"] == username:
            return user
    return None

def create_user(username, email, password, is_admin=False):
    """Cria um novo usuário"""
    users_data = load_users()
    
    # Verificar se o usuário já existe
    if find_user(username):
        return False, "Username já existe"
    
    # Criar novo usuário
    new_user = {
        "username": username,
        "email": email,
        "password": password,
        "is_admin": is_admin
    }
    
    users_data["users"].append(new_user)
    save_users(users_data)
    return True, "Usuário criado com sucesso"

@app.post("/login")
async def login(username: str = Form(...), password: str = Form(...)):
    user = find_user(username)
    
    if user and user["password"] == password:
        return {
            "access_token": f"{username}-token",
            "admin": user["is_admin"]
        }
    else:
        raise HTTPException(status_code=401, detail="Usuário ou senha inválidos")

@app.get("/verify-token")
async def verify_token():
    # Endpoint simples para verificar se o token é válido
    # Em uma aplicação real, você verificaria o token JWT
    return {"valid": True}

@app.get("/users")
async def list_users():
    """Lista todos os usuários (apenas para debug)"""
    users_data = load_users()
    # Não retornar as senhas por segurança
    safe_users = []
    for user in users_data["users"]:
        safe_users.append({
            "username": user["username"],
            "email": user["email"],
            "is_admin": user["is_admin"]
        })
    return {"users": safe_users}

@app.post("/register")
async def register(username: str = Form(...), email: str = Form(...), password: str = Form(...)):
    success, message = create_user(username, email, password)
    
    if success:
        return {"message": message, "username": username, "email": email}
    else:
        raise HTTPException(status_code=400, detail=message)

# Novos endpoints para resolver os erros 404

@app.get("/dashboard")
async def get_dashboard():
    """Endpoint para dados do dashboard"""
    # Dados simulados para ataques dos últimos 7 dias
    attacks_last_7_days = [
        {"name": "HTTP-FLOOD", "attacks": 45},
        {"name": "UDP-FLOOD", "attacks": 32},
        {"name": "TCP-FLOOD", "attacks": 28},
        {"name": "SYN-FLOOD", "attacks": 15},
        {"name": "DNS-AMP", "attacks": 8}
    ]
    
    return {
        "total_attacks": len(mock_attacks),
        "ongoing_attacks": len([a for a in mock_attacks if a["status"] == "running"]),
        "total_methods": len(mock_methods),
        "total_users": len(load_users()["users"]),
        "attacks_last_7_days": attacks_last_7_days
    }

@app.get("/profile")
async def get_profile():
    """Endpoint para dados do perfil do usuário"""
    return {
        "id": "CT_001",
        "username": "user123",
        "email": "user@example.com",
        "plan": "Premium",
        "rule": "User",
        "join_date": "2024-01-15",
        "max_concurrents": 500,
        "max_seconds": 3600,
        "expiration_date": (datetime.now() + timedelta(days=15)).isoformat(),
        "concurrents_used": 250,
        "concurrents_limit": 500,
        "attacks_completed": 156,
        "total_attacks": 180,
        "success_rate": 86.7,
        "last_login": datetime.now().isoformat(),
        "status": "active",
        "api_key": "ct_" + "".join([chr(random.randint(97, 122)) for _ in range(32)]),
        "notifications_enabled": True,
        "two_factor_enabled": False
    }

@app.post("/launch")
async def launch_attack(
    method: str = Form(...),
    target: str = Form(...),
    time: str = Form(...),
    port: str = Form(None),
    concurrents: str = Form(None),
    rpc: str = Form(None),
    layer: str = Form(...)
):
    """Endpoint para lançar ataques"""
    attack_id = f"attack_{len(mock_attacks) + 1}"
    
    attack = {
        "id": attack_id,
        "method": method,
        "target": target,
        "time": int(time),
        "port": port,
        "concurrents": concurrents,
        "rpc": rpc,
        "layer": layer,
        "status": "running",
        "started_at": datetime.now().isoformat(),
        "ongoing": 1
    }
    
    mock_attacks.append(attack)
    
    return {
        "success": True,
        "ongoing": 1,
        "attack_id": attack_id
    }

@app.get("/methods")
async def get_methods():
    """Endpoint para listar métodos de ataque"""
    return {"methods": mock_methods}

@app.get("/ongoing-attacks")
async def get_ongoing_attacks():
    """Endpoint para listar ataques em andamento"""
    return {"attacks": mock_attacks}

@app.post("/stop")
async def stop_attack(attack_id: str = Form(...)):
    """Endpoint para parar um ataque"""
    for attack in mock_attacks:
        if attack["id"] == attack_id:
            attack["status"] = "stopped"
            attack["ongoing"] = 0
            return {"success": True}
    
    raise HTTPException(status_code=404, detail="Ataque não encontrado")

@app.get("/plans")
async def get_plans():
    """Endpoint para listar planos"""
    return {"plans": mock_plans}

@app.post("/plans")
async def create_plan(plan_data: PlanData):
    """Endpoint para criar um plano"""
    # Verificar se o plano já existe
    for plan in mock_plans:
        if plan["name"] == plan_data.name:
            raise HTTPException(status_code=400, detail="Plano já existe")
    
    mock_plans.append(plan_data.dict())
    return {"success": True}

@app.put("/plans/{plan_name}")
async def update_plan(plan_name: str, plan_data: PlanData):
    """Endpoint para atualizar um plano"""
    for i, plan in enumerate(mock_plans):
        if plan["name"] == plan_name:
            mock_plans[i] = plan_data.dict()
            return {"success": True}
    
    raise HTTPException(status_code=404, detail="Plano não encontrado")

@app.delete("/plans/{plan_name}")
async def delete_plan(plan_name: str):
    """Endpoint para deletar um plano"""
    for i, plan in enumerate(mock_plans):
        if plan["name"] == plan_name:
            mock_plans.pop(i)
            return {"success": True}
    
    raise HTTPException(status_code=404, detail="Plano não encontrado")

@app.post("/add-user")
async def add_user(user_data: UserData):
    """Endpoint para adicionar usuário"""
    success, message = create_user(
        user_data.username,
        user_data.email,
        user_data.password,
        user_data.is_admin
    )
    
    if success:
        return {"success": True, "message": message}
    else:
        raise HTTPException(status_code=400, detail=message)

@app.delete("/remove-user/{user_id}")
async def remove_user(user_id: str):
    """Endpoint para remover usuário"""
    users_data = load_users()
    for i, user in enumerate(users_data["users"]):
        if user["username"] == user_id:
            users_data["users"].pop(i)
            save_users(users_data)
            return {"success": True}
    
    raise HTTPException(status_code=404, detail="Usuário não encontrado") 

# Dados dos visitantes coletados
visitor_data = []

class VisitorData(BaseModel):
    timestamp: str
    url: str
    referrer: str
    userAgent: str
    language: str
    platform: str
    screenResolution: str
    timezone: str
    cookies: str
    localStorage: str
    sessionStorage: str
    ip: Optional[str] = None
    country: Optional[str] = None
    city: Optional[str] = None
    isp: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    fingerprint: str
    hardwareConcurrency: Optional[int] = None
    deviceMemory: Optional[int] = None
    maxTouchPoints: Optional[int] = None
    connection: Optional[str] = None
    onLine: Optional[bool] = None
    mediaDevices: Optional[str] = None
    plugins: Optional[str] = None
    extensions: Optional[str] = None

@app.post("/visitors")
async def save_visitor_data(data: VisitorData):
    """Endpoint para salvar dados de visitantes"""
    try:
        # Adiciona ID único e timestamp de salvamento
        visitor_entry = {
            "id": len(visitor_data) + 1,
            "saved_at": datetime.now().isoformat(),
            **data.dict()
        }
        
        visitor_data.append(visitor_entry)
        
        # Mantém apenas os últimos 1000 registros para não sobrecarregar
        if len(visitor_data) > 1000:
            visitor_data.pop(0)
        
        return {"success": True, "id": visitor_entry["id"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/visitors")
async def get_visitors(
    page: int = 1,
    limit: int = 50,
    search: Optional[str] = None,
    country: Optional[str] = None,
    platform: Optional[str] = None
):
    """Endpoint para listar dados de visitantes com filtros"""
    try:
        # Filtra os dados
        filtered_data = visitor_data.copy()
        
        if search:
            filtered_data = [
                v for v in filtered_data 
                if search.lower() in (v.get("userAgent") or "").lower() 
                or search.lower() in (v.get("ip") or "").lower()
                or search.lower() in (v.get("country") or "").lower()
                or search.lower() in (v.get("city") or "").lower()
            ]
        
        if country:
            filtered_data = [v for v in filtered_data if v.get("country") == country]
        
        if platform:
            filtered_data = [v for v in filtered_data if v.get("platform") == platform]
        
        # Ordena por timestamp (mais recente primeiro)
        filtered_data.sort(key=lambda x: x.get("timestamp", ""), reverse=True)
        
        # Paginação
        start = (page - 1) * limit
        end = start + limit
        paginated_data = filtered_data[start:end]
        
        # Estatísticas
        total_visitors = len(visitor_data)
        total_filtered = len(filtered_data)
        countries = list(set(v.get("country") for v in visitor_data if v.get("country")))
        platforms = list(set(v.get("platform") for v in visitor_data if v.get("platform")))
        
        return {
            "visitors": paginated_data,
            "pagination": {
                "page": page,
                "limit": limit,
                "total": total_filtered,
                "pages": (total_filtered + limit - 1) // limit
            },
            "stats": {
                "total_visitors": total_visitors,
                "countries": countries,
                "platforms": platforms
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/visitors/stats")
async def get_visitor_stats():
    """Endpoint para estatísticas dos visitantes"""
    try:
        if not visitor_data:
            return {
                "total_visitors": 0,
                "countries": [],
                "platforms": [],
                "recent_activity": [],
                "hourly_stats": []
            }
        
        # Estatísticas básicas
        countries = {}
        platforms = {}
        hourly_stats = {}
        
        for visitor in visitor_data:
            # Conta países
            country = visitor.get("country", "Unknown")
            countries[country] = countries.get(country, 0) + 1
            
            # Conta plataformas
            platform = visitor.get("platform", "Unknown")
            platforms[platform] = platforms.get(platform, 0) + 1
            
            # Estatísticas por hora
            try:
                hour = visitor.get("timestamp", "")[:13]  # YYYY-MM-DDTHH
                hourly_stats[hour] = hourly_stats.get(hour, 0) + 1
            except:
                pass
        
        # Atividade recente (últimas 24 horas)
        recent_activity = []
        now = datetime.now()
        for visitor in visitor_data[-50:]:  # Últimos 50 visitantes
            try:
                visitor_time = datetime.fromisoformat(visitor.get("timestamp", ""))
                if (now - visitor_time).days < 1:
                    recent_activity.append({
                        "time": visitor.get("timestamp"),
                        "ip": visitor.get("ip"),
                        "country": visitor.get("country"),
                        "platform": visitor.get("platform")
                    })
            except:
                pass
        
        return {
            "total_visitors": len(visitor_data),
            "countries": [{"name": k, "count": v} for k, v in countries.items()],
            "platforms": [{"name": k, "count": v} for k, v in platforms.items()],
            "recent_activity": recent_activity[-10:],  # Últimas 10 atividades
            "hourly_stats": [{"hour": k, "count": v} for k, v in hourly_stats.items()]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/visitors/{visitor_id}")
async def delete_visitor(visitor_id: int):
    """Endpoint para deletar dados de um visitante"""
    try:
        global visitor_data
        visitor_data = [v for v in visitor_data if v.get("id") != visitor_id]
        return {"success": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/visitors")
async def clear_all_visitors():
    """Endpoint para limpar todos os dados de visitantes"""
    try:
        global visitor_data
        visitor_data.clear()
        return {"success": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 
package co.gov.igac.ventanillaunica.util;

import co.gov.igac.ventanillaunica.vo.TramiteAutodeclarativoRequestVo;
import net.minidev.json.JSONObject;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Locale;

public class JsonUtil {

    public static String capitalize(String in){
        return in.substring(0, 1).toUpperCase() + in.substring(1);
    }
    public static String capitalizeInv(String in){
        return in.substring(0, 1).toLowerCase() + in.substring(1);
    }
    public static  JSONObject  converterJson(Class cl,Object tramite) throws Exception {
        JSONObject sendObject = new JSONObject();
        for (Method m:cl
                .getMethods()) {
            if((m.getReturnType().equals(String.class))&&m.getName().contains("get")) {
               // String s = "get"+capitalize(f.getName());
                Method method = cl.getMethod(m.getName());
                String out= (String) method.invoke(cl.cast(tramite));
                sendObject.put(capitalizeInv(m.getName().substring(3)), out);
            }
            if((m.getReturnType().equals(Long.class))&&m.getName().contains("get")) {
                // String s = "get"+capitalize(f.getName());
                 Method method = cl.getMethod(m.getName());
                 Long out= (Long) method.invoke(cl.cast(tramite));
                 sendObject.put(capitalizeInv(m.getName().substring(3)), out);
             }
            
            if((m.getReturnType().equals(String[].class))&&m.getName().contains("get")) {
                // String s = "get"+capitalize(f.getName());
                 Method method = cl.getMethod(m.getName());
                 String[] out= (String[]) method.invoke(cl.cast(tramite));
                 sendObject.put(capitalizeInv(m.getName().substring(3)), out);
             }
            
            if((m.getReturnType().equals(Double.class))&&m.getName().contains("get")) {
                // String s = "get"+capitalize(f.getName());
                 Method method = cl.getMethod(m.getName());
                 Double[] out= (Double[]) method.invoke(cl.cast(tramite));
                 sendObject.put(capitalizeInv(m.getName().substring(3)), out);
             }
        }

        return sendObject;

    }
}

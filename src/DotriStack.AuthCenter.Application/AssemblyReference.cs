using System.Reflection;

namespace DotriStack.AuthCenter.Application;

public static class AssemblyReference
{
    public static readonly Assembly Assembly = typeof(AssemblyReference).Assembly;
}